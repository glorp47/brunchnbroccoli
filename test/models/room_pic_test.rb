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

require 'test_helper'

class RoomPicTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
