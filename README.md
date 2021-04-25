<h3> Setup and background </h3>

1. Clone repository
2. npm install
3. npm start
4. If it is running on port 3000, go to this link http://localhost:3000/
5. You should see a art portrait of a woman, which is loaded inside a Canvas component. The Canvas component can manipulate images.
6. No go to this link. http://localhost:3000/?image_id=girl_small_1MB&Lager_1=r6g23b30&Lager_10=r64g18b18&Lager_9=r6g23b30&Lager_8=r63g42b42&Lager_7=r63g42b42&Lager_6=r63g42b42&Lager_5=r63g42b42&Lager_4=r63g42b42&Lager_3=r63g42b42&Lager_2=r63g42b42
7. You should see the same image but it has now been manipulated by the Canvas component.
8. In the Canvas.js file, from line 107 to 113 you will see that I am calling the canvas.toDataURL("image/png") function, this function converts whatever is currently on the canvas into an image string. (In the case of PNG it becomes a base64 PNG string.


<h3> Third party website </h3>
1. So by tweaking GET parameters in the URL, the image can be changed.
2. A user on a third party website should therefore be able to call img src="http://localhost:3000/" to see the first picture, and then img src="http://localhost:3000/?image_id=girl_small_1MB&Lager_1=r6g23b30&Lager_10=r64g18b18&Lager_9=r6g23b30&Lager_8=r63g42b42&Lager_7=r63g42b42&Lager_6=r63g42b42&Lager_5=r63g42b42&Lager_4=r63g42b42&Lager_3=r63g42b42&Lager_2=r63g42b42" to see the second picture.

Here is where my problem is, because the React app is not returning an image but a whole DOM thingy.
