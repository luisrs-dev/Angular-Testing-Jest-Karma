import { ReduceTextPipe } from "./reduce-text.pipe"

describe('ReduceTextPipe', () => {
   let pipe: ReduceTextPipe;

   beforeEach( () =>{ 
    pipe = new ReduceTextPipe();
   });

   it('should create', ()=>{
    expect(pipe).toBeTruthy();
   })

   it('use transform correctly', () => {
    const text = "Hello this is a test to ch eck the pipe";
    const newText = pipe.transform(text, 5);
    expect(newText.length).toBe(5);
   })
})