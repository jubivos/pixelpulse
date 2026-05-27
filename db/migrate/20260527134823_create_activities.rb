class CreateActivities < ActiveRecord::Migration[8.1]
  def change
    create_table :activities do |t|
      t.references :user, null: false, foreign_key: true

      t.string :action, limit: 50, null: false

      t.references :target, polymorphic: true, null: false

      t.timestamps
    end

    add_index :activities, :action
  end
end