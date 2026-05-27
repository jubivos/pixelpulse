class CreateRoles < ActiveRecord::Migration[8.1]
  def change
    create_table :roles do |t|
      t.string :name, limit: 30, null: false
      t.jsonb :permissions, null: false, default: {}

      t.timestamps
    end

    add_index :roles, :name, unique: true
  end
end
