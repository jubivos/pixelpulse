admin = Role.find_or_create_by!(name: "admin")
user_role = Role.find_or_create_by!(name: "user")
moderator = Role.find_or_create_by!(name: "moderator")

user = User.find_or_create_by!(email: "user@test.com") do |u|
  u.password = "password"
  u.login = "user1"
  u.nickname = "PlayerOne"
  u.role = user_role
end

admin_user = User.find_or_create_by!(email: "admin@test.com") do |u|
  u.password = "password"
  u.login = "admin1"
  u.nickname = "Admin"
  u.role = admin
end

action = Genre.find_or_create_by!(name: "Action")
rpg = Genre.find_or_create_by!(name: "RPG")

open_world = Tag.find_or_create_by!(name: "Open World")
multiplayer = Tag.find_or_create_by!(name: "Multiplayer")

10.times do |i|
  game = Game.create!(
    title: "Game #{i + 1}",
    description: "Описание игры #{i + 1}",
    specifications: "Specs #{i + 1}",
    cover_image_url: "https://picsum.photos/300/200",
    release_date: Date.today - i.days
  )

  game.genres << [action, rpg].sample
  game.tags << [open_world, multiplayer].sample

  Review.create!(
    game: game,
    user: user,
    rating: rand(1..10),
    content: "Отзыв на игру #{game.title}"
    )
end

5.times do |i|
  News.create!(
    title: "Новость #{i + 1}",
    content: "Контент новости #{i + 1}",
    published_at: Time.now - i.hours,
    user: admin_user
  )
end