class CreateComments < ActiveRecord::Migration[8.1]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true

      t.references :commentable, polymorphic: true, null: false

      t.references :parent, foreign_key: { to_table: :comments }, null: true

      t.text :content, null: false

      t.integer :depth, null: false, default: 0

      t.timestamps
    end

    add_check_constraint :comments, "depth >= 0 AND depth <= 3", name: "comments_depth_check"
  end
end
