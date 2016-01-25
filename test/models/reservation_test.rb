# == Schema Information
#
# Table name: reservations
#
#  id           :integer          not null, primary key
#  room_id      :integer          not null
#  requester_id :integer          not null
#  guest_num    :integer          default(1), not null
#  start_date   :date             not null
#  end_date     :date             not null
#  status       :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class ReservationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
