<?php

    /* THE PLAN
    *  check if the json file exists
    *  open it
    *  read into a string variable line by line
    *
    */
    require("config.php");
    if($argc == 2 && isset($argv[1]))
    {
        $fileName = $argv[1];

        if(file_exists($fileName) && is_readable($fileName))
        {
            print($fileName . " exists and is readable\n");
            $gameFile = fopen($fileName, "r");
            if($gameFile == NULL)
            {
                print("What the fish!?");
                exit(1);
            }
            $gameCounter = 0;
            $gameList = NULL;
            $readBuffer = NULL;
            
            print("let's load the json\n");
            while( $readBuffer = fgets($gameFile, 750))
            {
                $gameList .= $readBuffer;
            }
            
            
            $gameArray = json_decode($gameList,true);
            $gameCount = count($gameArray["applist"]["apps"]);
            print("now let's make the query string\n");
            $queryString = "INSERT IGNORE INTO games (steamid, gameName) VALUES(?,?)";
            for($i = 0; $i < $gameCount; $i++)
            {
                if ($i < $gameCount - 2)
                {
                    CS50::query($queryString, $gameArray["applist"]["apps"][$i]["appid"], htmlentities($gameArray["applist"]["apps"][$i]["name"]));
                    print("game " . $i . " has been inserted into the database\n");
                    ++$gameCounter;
                }
                else if($i == $gameCount - 1)
                {
                    CS50::query($queryString, $gameArray["applist"]["apps"][$i]["appid"], htmlentities($gameArray["applist"]["apps"][$i]["name"]));
                    print("game " . $i . " has been inserted into the database\n");
                    print("This is the last game\n");
                    ++$gameCounter;
                }
                
                
            }

            print("number of games ready to go: {$gameCounter}\n");

        }
    }
    else
    {
        print("no good\n");
    }
?>
