# Collective Movement Exploration

__A web application to explore and analyze collective movement datasets.__

5 Stickelback fish             |  151 Goldenshiner fish
:-------------------------:|:-------------------------:
 <img src="https://raw.githubusercontent.com/dbvis-eren-ck/collective-movement-exploration/master/media/Fish5.gif" width=100%> |  <img src="https://raw.githubusercontent.com/dbvis-eren-ck/collective-movement-exploration/master/media/Fish151-dc.gif" width=100%>

---

## Main Features

* User and role management
* Upload datasets
* Feature extraction and visualization
  * Speed, acceleration, distance to centroid
  * Centroid, medoid, convex hull, delaunay triangulation, voronoi diagram
  * Convex hull area, swarm speed, swarm acceleration
* Network generation based on similarity
* Hierarchical clustering exploration
* Spatial view
* Export Data
* ...

---

### Installation

1. Install Docker on your local machine - [Link](https://www.docker.com/products/docker-desktop)

2. Open the terminal and clone the github repository:

```bash
git clone https://github.com/eren-ck/collective-movement-exploration.git
```

3. Move the project root folder:

```bash
cd collective-movement-exploration/
```

4. Create and run the docker container:

```bash
docker-compose up -d --build
```

5. Open your web browser and open the website `http://0.0.0.0:5000/`. Default Login information is email: `admin` and password `admin`.

6. You can upload the test file `data/fish-5.csv` and explore the small movement dataset.

---

## Documentation

* __[Input Files](https://github.com/dbvis-eren-ck/collective-movement-exploration/blob/master/doc/input.md)__
* __[Rest API](https://github.com/dbvis-eren-ck/collective-movement-exploration/blob/master/doc/rest.md)__

## Authors

* **Eren Cakmak**
* **Lukas Weixler**

## License

Released under GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to Juri Buchmüller, Prof. Daniel Keim, Jolle Jolles, Prof. Dr. Alex Jordan and Prof. Dr. Iain Couzin for their direct support of this project
