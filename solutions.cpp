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