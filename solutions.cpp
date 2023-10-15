#include <iostream>
using namespace std;

int main(){
    int n;
    cin>>n;
    for(int i=0;i<n;i++){
        int a,b,c;
        cin>>a>>b>>c;
        
        int x=0;

        if(a>b){
            x=a;
        }
        else{
            x=b;
        }
        int e= x-((a+b)/2);
        
        cout<<e/c+1<<endl;
    }
}
vector<string>arr;
    int x=0;
    for(int i=0;i<s.size();i++){
        if(s[i]==' ' || i==s.size()-1){
            string s1 = s.substr(x, i);
            arr.push_back(s1);
            x=i+1;
        }
    }
    vector<int>arr1;
    int y=1;
    x=0;
    for(int i=0;i<arr.size();i++){
        x=x*10;
            // if(arr[i]=="double"){
            //     y=2;
            // }
            // else if(arr[i]=="triple"){
            //     y=3;
            // }
            // else{
            if(arr[i]=="one"){
                x=x+1*y;
            }
            else if(arr[i]=="two"){
                x=x+2*y;
            }
            else if(arr[i]=="three"){
                x=x+3*y;
            }
            else if(arr[i]=="four"){
                x=x+4*y;
            }
            else if(arr[i]=="five"){
                x=x+5*y;
            }
            else if(arr[i]=="six"){
                x=x+6*y;
            }
            else if(arr[i]=="seven"){
                x=x+7*y;
            }
            else if(arr[i]=="eight"){
                x=x+8*y;
            }
            else if(arr[i]=="nine"){
                x=x+9*y;
            }
            // y=1;
            // }
    }
    
    string s1 = to_string(x);
    return s1;