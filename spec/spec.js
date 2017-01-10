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
   
   it("Should find OST in a string - case sensitive", function() {
       foo = "Dear Esther OST";
       
       expect(foo.indexOf(" OST") !== -1).toBe(true);
   });
   
   it("Should find Costume Pack in a string - case sensitive", function() {
       foo = "Resident Evil 0 Costume Pack 1";
       
       expect(foo.indexOf("Costume Pack") !== -1).toBe(true);
   });
   
   
   it("Should find Trailer in a string - case sensitive", function() {
       foo = "Dark Souls Trailer ESRB";
       
       expect(foo.indexOf("Trailer") !== -1).toBe(true);
   });
   
   it("Should find Activation in a string - case sensitive", function() {
       foo = "Watch_Dogs - Uplay Activation";
       
       expect(foo.indexOf("Activation") !== -1).toBe(true);
   });
   
   it("Should find Demo in a string - case sensitive", function() {
       foo = "Half-Life 2: Demo";
       
       expect(foo.indexOf(" Demo") !== -1).toBe(true);
   });
   
   it("Should find Art Book in a string - case sensitive", function() {
       foo = "Resident Evil 6: Art Book Japanese";
       
       expect(foo.indexOf("Art Book") !== -1).toBe(true);
   });
   
   it("Should find Drawing Course in a string - case sensitive", function() {
       foo = "Complete Figure Drawing Course HD: 024 - A Switch in Thinking";
       
       expect(foo.indexOf("Drawing Course") !== -1).toBe(true);
   });
   
   it("Should find Demo in a string - case sensitive", function() {
       foo = "DOOM Demo";
       
       expect(foo.indexOf(" Demo") !== -1).toBe(true);
   });
   
   it("Should find Artbook in a string - case sensitive", function() {
       foo = "Strike Suit Zero Artbook";
       
       expect(foo.indexOf(" Artbook") !== -1).toBe(true);
   });
   
   it("Should find Beta in a string - case sensitive", function() {
       foo = "Street Fighter V Beta";
       
       expect(foo.indexOf(" Beta") !== -1).toBe(true);
   });
   
   it("Should find Dedicated Server in a string - case sensitive", function() {
       foo = "Street Fighter V Beta";
       
       expect(foo.indexOf(" Beta") !== -1).toBe(true);
   });
   
   it("Should find Dedicated Server in a string - case sensitive", function() {
       foo = "Space Engineers Dedicated Server";
       
       expect(foo.indexOf("Dedicated Server") !== -1).toBe(true);
   });
   
   it("Should find Soundtrack in a string - case sensitive", function() {
       foo = "Psychonauts Original Soundtrack";
       
       expect(foo.indexOf("Soundtrack") !== -1).toBe(true);
   });
   
   it("Should find Starter Pack in a string - case sensitive", function() {
       foo = "Age of Empires Online DLC: Steam Starter Pack";
       
       expect(foo.indexOf("Starter Pack") !== -1).toBe(true);
   });
   
   it("Should find Season Pass in a string - case sensitive", function() {
       foo = "Assassin's Creed III - Season Pass Key";
       
       expect(foo.indexOf("Season Pass") !== -1).toBe(true);
   });
   
   it("Should find ValveTestApp in a string - case sensitive", function() {
       foo = "ValveTestApp852";
       
       expect(foo.indexOf("ValveTestApp") !== -1).toBe(true);
   });
   
   it("Should find Bundle in a string - case sensitive", function() {
       foo = "Crysis 2 LE Bundle";
       
       expect(foo.indexOf(" Bundle") !== -1).toBe(true);
   });
   
   it("Should find Costume in a string - case sensitive", function() {
       foo = "Crysis 2 LE Bundle";
       
       expect(foo.indexOf(" Bundle") !== -1).toBe(true);
   });
   
   it("Should find Costume in a string - case sensitive", function() {
       foo = "SSFIV:AE All-in Costume Pack (compatible w/Ultra SFIV)";
       
       expect(foo.indexOf(" Costume") !== -1).toBe(true);
   });
   
   


});