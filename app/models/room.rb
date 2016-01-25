# == Schema Information
#
# Table name: rooms
#
#  id             :integer          not null, primary key
#  host_id        :integer          not null
#  title          :string           not null
#  type_id        :integer          not null
#  price          :integer          not null
#  city           :string           not null
#  lat            :float            not null
#  lng            :float            not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  primary_pic_id :integer          not null
#  max_guest_num  :integer          not null
#  bed_num        :integer          not null
#

class Room < ActiveRecord::Base

  belongs_to :host,
    primary_key: "id",
    foreign_key: "host_id",
    class_name: "User"

  has_one :host_profile,
    through: :host,
    source: :user_profile

  has_many :room_pics,
    primary_key: "id",
    foreign_key: "room_id",
    class_name: "RoomPic"

  has_one :primary_pic,
    primary_key: "primary_pic_id",
    foreign_key: "id",
    class_name: "RoomPic"

  has_many :reservations

  validates :host_id, :title, :type_id, :price, :city, :lat, :lng, presence: true

  # need to set a limit of 3-month window when date gets large
  def unavailable_date_ranges_from_today
    self.reservations
        .where('end_date > ?', Date.today())
        .where(status: [1, 5])
        .map {|item| [item.start_date, item.end_date]}
  end

  # need to refactor the following methods!
  def self.in_geo_bounds(geo_bounds)
    lat_range = [geo_bounds['southWest']['lat'], geo_bounds['northEast']['lat']]
    lng_range = [geo_bounds['southWest']['lng'], geo_bounds['northEast']['lng']]
    Room.where(:lat => lat_range[0]..lat_range[1],
                :lng => lng_range[0]..lng_range[1])
  end

  # conditional chaining
  def self.search_result(geo_bounds, start_date, end_date, guests=1)
    lat_range = [geo_bounds['southWest']['lat'], geo_bounds['northEast']['lat']]
    lng_range = [geo_bounds['southWest']['lng'], geo_bounds['northEast']['lng']]
    Room.includes(:room_pics).
        where(:lat => lat_range[0]..lat_range[1],
               :lng => lng_range[0]..lng_range[1])
  end

  # def self.search_result(geo_bounds)
  #   lat_range = [geo_bounds['southWest']['lat'], geo_bounds['northEast']['lat']]
  #   lng_range = [geo_bounds['southWest']['lng'], geo_bounds['northEast']['lng']]
  #   Room.includes(:room_pics)
  #       .where(:lat => lat_range[0]..lat_range[1],
  #              :lng => lng_range[0]..lng_range[1])
  # end


  def self.all_with_details
    Room.includes(:primary_pic).includes(:room_pics).includes(:host_profile)
  end

  def self.filtered_all_with_details(filter_params)
    geo_bounds = filter_params[:bounds]
    lat_range = [geo_bounds['southWest']['lat'], geo_bounds['northEast']['lat']]
    lng_range = [geo_bounds['southWest']['lng'], geo_bounds['northEast']['lng']]
    guests = filter_params[:guests] || 1
    start_date = filter_params["dates"]["checkin"]
    end_date = filter_params["dates"]["checkout"]
    unavailable_room_ids = Reservation.unavailable_room_ids(start_date, end_date)
    room_types = filter_params[:roomTypes]
    min_price = filter_params[:priceRange]['min']
    max_price = filter_params[:priceRange]['max']
    selected_room_types = room_types.keys.select { |type| room_types[type]=="true" }
    # debugger
    Room.includes(:primary_pic).
        includes(:room_pics).
        includes(:host_profile).
        where(:lat => lat_range[0]..lat_range[1],
              :lng => lng_range[0]..lng_range[1]).
        where('max_guest_num >= ?', guests).
        where('type_id IN (?)', selected_room_types).
        where('price BETWEEN ? AND ?', min_price, max_price).
        where.not(id: unavailable_room_ids)
  end

  def self.find_by_id_with_details(roomId)
    Room.includes(:primary_pic).includes(:room_pics).includes(:host_profile).find_by_id(roomId)
  end

  ROOM_TYPE = {
    1 => "Entire Home/Apt",
    2 => "Private Room",
    3 => "Shared Bedroom"
  }

end
