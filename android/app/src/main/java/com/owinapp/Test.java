package com.owinapp;

import android.widget.Toast;

import androidx.annotation.NonNull;

//https://facebook.github.io/react-native/
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class Test extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
     Test(ReactApplicationContext context){
         super(context);
         reactContext = context;
     }

     @Override
    public String getName(){
         return "Test";
     }

     @ReactMethod
    public void ShowMessage(String message, int duration){
         Toast.makeText(getReactApplicationContext(), message, duration).show();
     }
}