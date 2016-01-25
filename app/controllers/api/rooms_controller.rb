class Api::RoomsController < ApplicationController
  before_action :require_login!, except: [:index, :show]

  def index
    # initially show all rooms, later change to current map view
    # @rooms = Room.all_with_details
    # later switch to jbuilder
    # render json: @rooms, status: 200

    # jbuilder (all rooms with details)

    # jbuilder (filtered rooms with details)
    # debugger
    @rooms = Room.filtered_all_with_details(filter_params)
    render :index
  end

  def create
    @room = current_user.listings.new(room_params)
    if @room.save
      render json: @room, status: 201
    else
      render json: @room.errors.full_messages, status: 400
    end
  end

  def update
    @room = current_user.listings.find_by_id(params[:room][:id])
    if @room.nil?
      render json: {error: "Listing not found or unauthorized request"}, status: 401
    elsif @room.update(room_params)
      render json: @room, status: 200
    else
      render json: @room.errors.full_messages, status: 400
    end

  end

  def show
    @room = Room.find_by_id_with_details(params[:id])
    if @room.nil?
      render json: {error: "Room not found"}, status: 401
    else
      # initial test
      # render json: @room, status: 200

      # using jbuilder to package data with pictures
      render :show, status: 200
    end
  end

  def destroy
    @room = current_user.listings.find_by_id(params[:id])
    if @room.nil?
      render json: {error: "Listing not found or unauthorized request"}, status: 401
    elsif @room.delete
      render json: @room, status: 200
    else
      render json: @room.errors.full_messages, status: 400
    end
  end

  private
  def room_params
    params.require(:room).permit(:title, :type_id, :price, :city, :lat, :lng)
  end

  def filter_params
    # .permit(:bounds) doesn't work
    # debugger
    params.require(:filter)
          .permit({
            bounds: {
              northEast: [:lat, :lng],
              southWest: [:lat, :lng]
                    },
            dates: [:checkin, :checkout],
            roomTypes: ["1", "2", "3"],
            priceRange: [:min, :max]
            },
           :guests)
    # params.require(:filter)
  end

end
