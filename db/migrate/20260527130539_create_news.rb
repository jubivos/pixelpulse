class CreateNews < ActiveRecord::Migration[8.1]
  def change
    create_table :news do |t|
      t.references :user, null: false, foreign_key: true

      t.string :title, limit: 200, null: false
      t.text :content

      t.datetime :published_at

      t.timestamps
    end

    add_index :news, :published_at
  end
end
