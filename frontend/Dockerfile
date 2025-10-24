# Use a compatible Node.js version
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json to the container
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the development server
CMD ["yarn", "dev"]
