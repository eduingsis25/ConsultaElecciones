package com.example.simulador27j

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity(){
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        true.also { webView.settings.javaScriptEnabled = it }
        webView.webViewClient = WebViewClient()

        // Archivo HTML
        webView.loadUrl("file:///android_asset/index.html")

        setContentView(webView)
    }
}