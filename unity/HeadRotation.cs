using System.Collections;
using System;
using UnityEngine;


[System.Serializable]
public class HeadRotation
{
    public float x;
    public float y;
    public float z;

    public static HeadRotation fromVector3(Vector3 vector) {
        HeadRotation rotation = new HeadRotation();
        rotation.x = vector.x;
        rotation.y = vector.y;
        rotation.z = vector.z;

        return rotation;
    }
}