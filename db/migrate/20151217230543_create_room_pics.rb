class CreateRoomPics < ActiveRecord::Migration
  def change
    create_table :room_pics do |t|
      t.integer :room_id, null: false
      t.string :pic_url, null: false
      t.timestamps null: false
    end
    add_index :room_pics, :room_id
    add_index :rooms, :primary_pic_id
  end
end
