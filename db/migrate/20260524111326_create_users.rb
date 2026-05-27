class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    enable_extension "citext"

    create_table :users do |t|
      t.citext :email, null: false
      t.string :login, limit: 50, null: false
      t.string :nickname, limit: 50

      t.string :password_digest, null: false

      t.references :role, null: false, foreign_key: true

      t.datetime :last_activity_at
      t.datetime :registered_at, null: false, default: -> { 'CURRENT_TIMESTAMP' }

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :login, unique: true
  end
end
