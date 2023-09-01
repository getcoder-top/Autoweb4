#include <iostream>
#include <vector>
using namespace std;

int main(){
    int x=0;
    int y=0;
    int e=0;
    vector<int>arr1;
    vector<int>arr2;
    vector<int>arr3;
    for(int i=0;i<nums.size()-2;i++){
        x=nums[i]+x;
        arr1.push_back(x);
    }

    for(int j=nums.size()-1;j>=1;j--){
        y=nums[j]+y;
        arr2.push_back(y);
    }

    for(int i=0;i<arr1.size();i++){
        e=abs(arr1[i]-arr2[i]);
        arr3.push_back(e);
    }
    return arr3;
}