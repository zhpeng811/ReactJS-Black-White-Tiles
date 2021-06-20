# Installation Guide
## Running the application with Docker
### To Run with Docker:
***1.*** Install [Docker](https://www.docker.com/get-started)

***2.*** Make sure docker is running

***3.*** change to the project directory:
#### `cd ReactJS-Black-White-Tiles` <br />

***4.*** run the following to build the docker image:
#### `docker build -t black-white-tiles .` <br />

***5.*** run the following to start the docker container:
#### `docker run -p 3000:3000 --name black-white-tiles black-white-tiles` <br />
The `-p 3000:3000` does a port forwarding from container to your host, which you can goto [http://localhost:3000] in your browser to play the game<br />

### To Remove the docker container, image, and build cache
Remove container:
#### `docker rm black-white-tiles -f`

Remove image:
#### `docker rmi black-white-tiles`

Remove build cache:
#### `docker builder prune`

## Running the application on your local machine
***1.*** Install NodeJS if you don't have it, recommended version is v12.18.1, you can check your NodeJS version by running:
#### `node -v`
You can install at https://nodejs.org/en/download/ if you don't have NodeJS installed already. <br />

***2.*** clone the repository, you can either directly download the .zip version on gitlab or by running:
#### `git clone https://github.com/zhpeng811/ReactJS-Black-White-Tiles.git`
**Note: you must have git installed to use git clone** <br />

***3.*** change to the project directory:
#### `cd ReactJS-Black-White-Tiles` <br />

***4.*** run the following to install the required node modules:
#### `npm install` <br />

***5.*** run the following to play the game:
#### `npm start`
A browser should automatically open with the game launch, or you can open it maually by typing [http://localhost:3000] in your browser <br />

# Gamerule
You are given two boards, one target board and one game board, the game board will be initally all white blocks, you can click the blocks on the game board but NOT on the target board

***when you click on a block, the block itself and ALL adjacent blocks(top,left,bottom,right) will revert its color(WHITE -> BLACK or BLACK -> WHITE)***

Your goal is to use the lowest amount of clicks to get the game board pattern to ***exactly*** match the target board pattern 

## Want to challenge yourself? Try blind mode
In blind mode, you have to memorize the target board pattern before starting the game, once you click the start game button, the target board pattern ***will be hidden***

To make blind mode still playable, you have the option to ***show*** the target board pattern again. However, you cannot click on the game board when the target board pattern is shown, you must click ***hide*** again to resume the clicking.

To challange yourself, try to use the show and hide options as few as possible

Have fun!

# Credits
The start menu background image is found from: http://www.seekgif.com/free-image/black-and-white-wallpaper-best-hd-wallpaper-5750.html
