# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_02_150610) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pg_trgm"

  create_table "activities", force: :cascade do |t|
    t.string "action", limit: 50, null: false
    t.datetime "created_at", null: false
    t.bigint "target_id", null: false
    t.string "target_type", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["action"], name: "index_activities_on_action"
    t.index ["target_type", "target_id"], name: "index_activities_on_target"
    t.index ["user_id"], name: "index_activities_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "commentable_id", null: false
    t.string "commentable_type", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.integer "depth", default: 0, null: false
    t.bigint "parent_id"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable"
    t.index ["parent_id"], name: "index_comments_on_parent_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
    t.check_constraint "depth >= 0 AND depth <= 3", name: "comments_depth_check"
  end

  create_table "game_genres", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "game_id", null: false
    t.bigint "genre_id", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id", "genre_id"], name: "index_game_genres_on_game_id_and_genre_id", unique: true
    t.index ["game_id"], name: "index_game_genres_on_game_id"
    t.index ["genre_id"], name: "index_game_genres_on_genre_id"
  end

  create_table "game_tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "game_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id", "tag_id"], name: "index_game_tags_on_game_id_and_tag_id", unique: true
    t.index ["game_id"], name: "index_game_tags_on_game_id"
    t.index ["tag_id"], name: "index_game_tags_on_tag_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "cover_image_url"
    t.datetime "created_at", null: false
    t.text "description"
    t.date "release_date"
    t.text "specifications"
    t.string "title", limit: 200, null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_games_on_title", opclass: :gin_trgm_ops, using: :gin
  end

  create_table "genres", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_genres_on_name", unique: true
  end

  create_table "likes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "likeable_id", null: false
    t.string "likeable_type", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable_type_and_likeable_id"
    t.index ["user_id", "likeable_type", "likeable_id"], name: "index_likes_on_user_id_and_likeable_type_and_likeable_id", unique: true
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "news", force: :cascade do |t|
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "published_at"
    t.string "title", limit: 200, null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["published_at"], name: "index_news_on_published_at"
    t.index ["user_id"], name: "index_news_on_user_id"
  end

  create_table "news_images", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "image_url", null: false
    t.boolean "is_cover", default: false, null: false
    t.bigint "news_id", null: false
    t.integer "position"
    t.datetime "updated_at", null: false
    t.index ["news_id", "position"], name: "index_news_images_on_news_id_and_position"
    t.index ["news_id"], name: "index_news_images_on_news_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "action", null: false
    t.bigint "actor_id", null: false
    t.datetime "created_at", null: false
    t.bigint "notifiable_id", null: false
    t.string "notifiable_type", null: false
    t.boolean "read", default: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["actor_id"], name: "index_notifications_on_actor_id"
    t.index ["notifiable_type", "notifiable_id"], name: "index_notifications_on_notifiable"
    t.index ["read"], name: "index_notifications_on_read"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.text "content"
    t.datetime "created_at", null: false
    t.bigint "game_id", null: false
    t.integer "rating", null: false
    t.string "status", limit: 20, default: "draft", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["game_id", "rating"], name: "index_reviews_on_game_id_and_rating"
    t.index ["game_id"], name: "index_reviews_on_game_id"
    t.index ["rating"], name: "index_reviews_on_rating"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", limit: 30, null: false
    t.jsonb "permissions", default: {}, null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_roles_on_name", unique: true
  end

  create_table "tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.citext "email", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "last_activity_at"
    t.string "login", limit: 50, null: false
    t.string "nickname", limit: 50
    t.datetime "registered_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.bigint "role_id", null: false
    t.datetime "updated_at", null: false
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["login"], name: "index_users_on_login", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "activities", "users"
  add_foreign_key "comments", "comments", column: "parent_id"
  add_foreign_key "comments", "users"
  add_foreign_key "game_genres", "games"
  add_foreign_key "game_genres", "genres"
  add_foreign_key "game_tags", "games"
  add_foreign_key "game_tags", "tags"
  add_foreign_key "likes", "users"
  add_foreign_key "news", "users"
  add_foreign_key "news_images", "news"
  add_foreign_key "notifications", "users"
  add_foreign_key "notifications", "users", column: "actor_id"
  add_foreign_key "reviews", "games"
  add_foreign_key "reviews", "users"
  add_foreign_key "users", "roles"
end
