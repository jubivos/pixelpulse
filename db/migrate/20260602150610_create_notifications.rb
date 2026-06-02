class CreateNotifications < ActiveRecord::Migration[8.1]
  def change
    create_table :notifications do |t|
      t.references :user, null: false, foreign_key: true

      # кто инициировал действие
      t.references :actor, null: false, foreign_key: { to_table: :users }

      # на что направлено
      t.string :action, null: false

      t.references :notifiable, polymorphic: true, null: false

      t.boolean :read, default: false

      t.timestamps
    end

    add_index :notifications, :read
  end
end