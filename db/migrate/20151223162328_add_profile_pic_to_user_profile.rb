class AddProfilePicToUserProfile < ActiveRecord::Migration
  def change
    add_column :user_profiles, :profile_pic_url, :string
  end
end
