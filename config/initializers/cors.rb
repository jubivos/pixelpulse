Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://172.24.238.248:3001"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end