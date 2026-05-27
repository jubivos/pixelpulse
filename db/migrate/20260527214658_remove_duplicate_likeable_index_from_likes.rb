class RemoveDuplicateLikeableIndexFromLikes < ActiveRecord::Migration[8.1]
  def change
    remove_index :likes, name: "index_likes_on_likeable"
  end
end
