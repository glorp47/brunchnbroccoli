class CreateUserProfiles < ActiveRecord::Migration
  def change
    create_table :user_profiles do |t|
      t.integer :user_id, null: false
      t.string :fname
      t.string :lname
      t.string :current_city
      t.timestamps null: false
    end

    add_index :user_profiles, :user_id, unique: true
  end
end
