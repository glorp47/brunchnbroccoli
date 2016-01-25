json.partial! @room, partial: 'api/rooms/room', as: :room
json.invalidDateRanges @room.unavailable_date_ranges_from_today
