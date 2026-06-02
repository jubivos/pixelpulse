class ApiResponse
  def self.success(data:, meta: {})
    {
      data: data,
      meta: meta
    }
  end

  def self.error(message:, code: "ERROR")
    {
      error: {
        code: code,
        message: message
      }
    }
  end
end