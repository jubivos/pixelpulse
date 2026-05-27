class CreateNewsImages < ActiveRecord::Migration[8.1]
  def change
    create_table :news_images do |t|
      t.references :news, null: false, foreign_key: true

      t.string :image_url, null: false
      t.integer :position
      t.boolean :is_cover, default: false, null: false

      t.timestamps
    end

    add_index :news_images, [:news_id, :position]
  end
end
