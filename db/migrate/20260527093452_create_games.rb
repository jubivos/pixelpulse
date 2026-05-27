class CreateGames < ActiveRecord::Migration[8.1]
  def change
    create_table :games do |t|
      t.string :title, limit: 200, null: false
      t.text :description
      t.text :specifications
      t.string :cover_image_url
      t.date :release_date

      t.timestamps
    end

    enable_extension "pg_trgm"
    add_index :games, :title, using: :gin, opclass: :gin_trgm_ops
  end
end
