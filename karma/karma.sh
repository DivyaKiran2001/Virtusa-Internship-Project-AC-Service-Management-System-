#!/bin/bash

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;
    

    # checking for login component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/auth/login" ]
    then
        cp /home/coder/project/workspace/karma/login.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/auth/login/login.component.spec.ts;
    else
        echo "FE_loginTest FAILED";
    fi 

    # checking for signup component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/auth/signup" ]
    then
        cp /home/coder/project/workspace/karma/signup.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/auth/signup/signup.component.spec.ts;
    else
        echo "FE_signupTest FAILED";
    fi 

    # checking for addcenter component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/adminside/addcenter" ]
    then
        cp /home/coder/project/workspace/karma/addcenter.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/adminside/addcenter/addcenter.component.spec.ts;
    else
        echo "FE_addcenterTest FAILED";
    fi 

     # checking for service component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/adminside/service" ]
    then
        cp /home/coder/project/workspace/karma/service.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/adminside/service/service.component.spec.ts;
    else
        echo "FE_serviceTest FAILED";
    fi

          # checking for adminhomepage component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/adminside/adminhomepage" ]
    then
        cp /home/coder/project/workspace/karma/adminhomepage.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/adminside/adminhomepage/adminhomepage.component.spec.ts;
    else
        echo "FE_adminHomePageTest FAILED";
    fi


    # checking for adminreview component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/adminside/adminreview" ]
    then
        cp /home/coder/project/workspace/karma/adminreview.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/adminside/adminreview/adminreview.component.spec.ts;
    else
        echo "FE_adminReviewTest FAILED";
    fi

    
    # checking for customerhomepage component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/customerside/customerhomepage" ]
    then
        cp /home/coder/project/workspace/karma/customerhomepage.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/customerside/customerhomepage/customerhomepage.component.spec.ts;
    else
        echo "FE_customerHomePageTest FAILED";
    fi 

    # checking for mybooking component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/customerside/mybooking" ]
    then
        cp /home/coder/project/workspace/karma/mybooking.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/customerside/mybooking/mybooking.component.spec.ts;
    else
        echo "FE_myBookingTest FAILED";
    fi 


   # checking for customerreview component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/customerside/customerreview" ]
    then
        cp /home/coder/project/workspace/karma/customerreview.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/customerside/customerreview/customerreview.component.spec.ts;
    else
        echo "FE_customerReviewTest FAILED";
    fi 

    cd /home/coder/project/workspace/angularapp/;
    npm test;
else   
    echo "FE_loginTest FAILED";
    echo "FE_signupTest FAILED";
    echo "FE_addcenterTest FAILED";
    echo "FE_serviceTest FAILED";
    echo "FE_adminHomePageTest FAILED";
    echo "FE_adminReviewTest FAILED";
    echo "FE_customerHomePageTest FAILED";
    echo "FE_myBookingTest FAILED";
    echo "FE_customerReviewTest FAILED";
fi

