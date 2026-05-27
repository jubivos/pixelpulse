class CreateReviews < ActiveRecord::Migration[8.1]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true

      t.integer :rating, null: false
      t.text :content

      t.string :status, limit: 20, null: false, default: "draft"

      t.timestamps
    end

    add_index :reviews, :rating
    add_index :reviews, [:game_id, :rating]
  end
end
