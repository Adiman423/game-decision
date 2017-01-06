describe("A suite of replacement tests.", function(){
   var foo;
   
   it("Should replace colon trailing space with dash with leading and trailing space", function(){
       foo = "Warlock: master of the arcane";
       var bar = "Warlock - master of the arcane";
       expect(foo.replace(": "," - ")).toBe(bar);
   });
   
   it("Should replace colon trailing space with dash with nothing", function(){
       foo = "Warlock: master of the arcane";
       var bar = "Warlock master of the arcane";
       expect(foo.replace(": "," ")).toBe(bar);
   });
   
   it("Should uppercase a string", function(){
       foo = "Total War: ATTILA";
       var bar = "TOTAL WAR: ATTILA";
       expect(foo.toUpperCase()).toBe(bar);
   });
   
   it("Should find an underscore and replace with a space", function(){
       foo = "Watch_Dogs";
       var bar = "Watch Dogs";
       expect(foo.replace("_"," ")).toBe(bar);
   });
   
   it("Should replace ampersand with and", function(){
       foo = "Heroes of Might & Magic V";
       var bar = "Heroes of Might and Magic V";
       expect(foo.replace("&","and")).toBe(bar);
   });
   
   it("Should replace TM with nothing", function(){

       foo = "DARK SOULS\u2122 II";
       var bar ="DARK SOULS II";
       
       expect(foo.replace("\u2122","")).toBe(bar);
   });
   
   it("Should replace registered symbol with nothing", function(){

       foo = "Far Cry® 3";
       var bar ="Far Cry 3";
       
       expect(foo.replace("®","")).toBe(bar);
   });
   
   it("Should replace trademark symbol and colon trailing space with nothing", function(){

       foo = "Dark Souls\u2122 II: Crown of the Sunken King";
       var bar ="Dark Souls II Crown of the Sunken King";
       
       expect(foo.replace("\u2122","").replace(": "," ")).toBe(bar);
   });
   
   it("Should replace trademark symbol and colon trailing space with nothing and strip white space", function(){

       foo = " DARK SOULS\u2122 II Crown of the Ivory King ";
       var bar ="Dark Souls II: Crown of the Ivory King";
       
       expect(foo.replace("\u2122","").trim().toLowerCase()).toBe(bar.replace(": "," ").toLowerCase());
   });
   
   

});