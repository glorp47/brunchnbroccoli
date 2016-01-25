# == Schema Information
#
# Table name: room_pics
#
#  id         :integer          not null, primary key
#  room_id    :integer          not null
#  pic_url    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class RoomPic < ActiveRecord::Base
  validates :room_id, :pic_url, presence: true

  belongs_to :room
end
