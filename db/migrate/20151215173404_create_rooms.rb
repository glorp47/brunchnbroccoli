class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.integer :host_id, null: false
      t.string :title, null: false
      t.integer :type_id, null: false
      t.integer :price, null: false
      t.string :city, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.timestamps null: false
    end
    add_index :rooms, :host_id
    
  end
end
