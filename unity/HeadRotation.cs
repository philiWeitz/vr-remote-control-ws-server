using System.Collections;
using System;
using UnityEngine;


[System.Serializable]
public class HeadRotation
{
    public int vertical;
    public int horizontal;

    public static HeadRotation fromVector3(Vector3 vector)
    {
        HeadRotation rotation = new HeadRotation();
        rotation.vertical = EulerToPWM(vector.x);
        rotation.horizontal = EulerToPWM(vector.y);

        return rotation;
    }

    private static int EulerToPWM(float eulerAngle, int angleOffset = 0) {
        double value = 0;

        // map to 0 - 180 degree
        if (eulerAngle < 180)
        {
            value = Math.Max(0, 90 - eulerAngle);
        }
        else
        {
            value = Math.Min(180, 90 + Math.Abs(eulerAngle - 360));
        }

        // map to 0 - 1800 + 500 offset
        return (int) Math.Round((180.0 * value) / 180.0) + 500;
    }
}