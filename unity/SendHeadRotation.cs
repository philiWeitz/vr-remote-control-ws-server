using System.Collections;
using System;
using UnityEngine;

public class SendHeadRotation : MonoBehaviour
{
    private WebSocket ws;

    IEnumerator Start()
    {
        ws = new WebSocket(new Uri("add-ws-server-url-here"));
        yield return StartCoroutine(ws.Connect());

        InvokeRepeating("SendHeadRotationTask", 1.0f, 0.1f);
    }

    void SendHeadRotationTask()
    {
        // get camera rotation
        Vector3 rotation = Camera.main.gameObject.transform.rotation.eulerAngles;

        string json = JsonUtility.ToJson(HeadRotation.fromVector3(rotation));
        ws.SendString(json);

        if (ws.error != null)
        {
            Debug.LogError("Error connecting to web socket server");
        }
    }
}
