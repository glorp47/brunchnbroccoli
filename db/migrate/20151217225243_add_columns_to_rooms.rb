class AddColumnsToRooms < ActiveRecord::Migration
  def change
    add_column :rooms, :primary_pic_id, :integer, null: false
    add_column :rooms, :max_guest_num, :integer, null: false
    add_column :rooms, :bed_num, :integer, null: false
  end
end
