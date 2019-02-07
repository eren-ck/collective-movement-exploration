# Input File Format

The web interface will accept two CSV (comma-separated values) files, multiple parameters and a background image for the spatial view.

### Animal Movement File

Field             |  Definition
:-------------------------:|:-------------------------:
animal_id  | Unique animal number ID
time | Frame number
x | X coordinate
y | Y coordinate

__For example:__
```
Animal_id,Time,X,y
0,0,102.5,22
1,0,50,60
2,0,44,86
0,1,102,23
...
```
---
### Reference File for Animals (optional)

Field             |  Definition
:-------------------------:|:-------------------------:
animal_id  | Unique animal number ID
species | Species of the animal  
sex | Sex of the animal
size | Size of the animal
weight |  Weight of the animal

__For example:__
```
animal_id,species,sex,size,weight
1,"stickelback","m","5.8","95"
2,"stickelback","m","4.8","81"
3,"stickelback","m","5.3","86",
...
```
---
### Other parameters

Field             |  Definition
:-------------------------:|:-------------------------:
Coordinate origin  | Coordinate origin
min [x,y] | Minimum values for x and y
max [x,y] | Maximum values for x and y
Inverted coordinate system | True if the coordinate system should be inverted
FPS |  Frames per second (needed for calculation of speed per second)
Background image | Background image for the spatial view
