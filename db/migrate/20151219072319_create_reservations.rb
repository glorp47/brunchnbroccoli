class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :room_id, null: false
      t.integer :requester_id, null: false
      t.integer :guest_num, null: false, default: 1
      t.date    :start_date, null: false
      t.date    :end_date, null: false
      t.integer :status, null: false, default: 0

      t.timestamps null: false
    end
    add_index :reservations, :room_id
    add_index :reservations, :requester_id
  end
end
