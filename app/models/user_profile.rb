# == Schema Information
#
# Table name: user_profiles
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  fname           :string
#  lname           :string
#  current_city    :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  profile_pic_url :string
#

class UserProfile < ActiveRecord::Base
  belongs_to :user, inverse_of: :user_profile
end
