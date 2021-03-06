//
//  Test.swift
//  OwinApp
//
//  Created by pje on 2022/03/04.
//

import Foundation
import UIKit

@objc(Test)

class Test: NSObject, RCTBridgeModule{
  static func moduleName() -> String! {
    return "Test";
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return true;
  }
  
  @objc
  func ShowMessage(_ message:NSString, duration:Double) -> Void {
    let alert = UIAlertController(title: nil, message: message as String, preferredStyle: .alert);
    let seconds:Double = duration/1000;
    alert.view.backgroundColor = .black
    alert.view.alpha = 0.5
    alert.view.layer.cornerRadius = 14
    
    DispatchQueue.main.async {
      (UIApplication.shared.delegate as? AppDelegate)?.window?.rootViewController?.present(alert, animated: true, completion: nil);
    }
    
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + seconds, execute: {
      alert.dismiss(animated: true, completion: nil)
      
    })
    
  }
}
