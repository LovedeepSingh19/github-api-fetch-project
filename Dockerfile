# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /usr/src/app
RUN echo "DEPLOYED_URL=3.106.193.190" > .env
# RUN npm install -g http
# Copy package.json and package-lock.json to the working directory
RUN rm -rf ./server
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 8080

# Run app.js when the container launches
CMD ["npm", "start"]
