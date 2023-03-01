import * as THREE from "../../three.js-master/build/three.module.js";

class	App
{
	constructor()
	{
		const	divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer;

		const	renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setPixelRatio(window.devicePixelRatio);
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer;

		const	scene = new THREE.Scene();
		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();

		window.onresize = this.resize.bind(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupCamera()
	{
		const		width = window.innerWidth;
		const		height = window.innerHeight;
		const	camera = new THREE.PerspectiveCamera(75,
								width / height,
								0.1,
								100);
		camera.position.z = 2;
		this._camera = camera;
	}

	_setupLight()
	{
		const	color = 0xffffff;
		const	intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-5, 5, 5);
		this._scene.add(light);
	}

	_setupModel()
	{
		const	getometry = new THREE.BoxGeometry(1, 1, 1);
		const	meterial = new THREE.MeshPhongMaterial({color: 0x443377});

		const	cube = new THREE.Mesh(getometry, meterial);

		this._scene.add(cube);
		this._cube = cube;
	}

	resize()
	{
		const		width = window.innerWidth;
		const		height = window.innerHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time)
	{
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	update(time)
	{
		time *= 0.001; //second unit
		this._cube.rotation.x = time;
		this._cube.rotation.y = time;
	}
}

window.onload = function()
{
	new	App();
}
