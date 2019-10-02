        var count = 0;
        function Click(obj) {
            if (obj.innerText != 'X' && obj.innerText != 'O') {
                count++;
                obj.innerText = OorX();
                Check();
            }
        }

        function OorX() {
            if (count % 2 == 0) {
                return 'O';
            }
            else {
                return 'X';
            }
        }

        function Check(){
            if (box5.innerText != ''  )
            {
                if ((box5.innerText == box2.innerText) && (box5.innerText == box8.innerText)){
                    alert (box5.innerText + ' Win!')
                }
                else if ((box5.innerText == box1.innerText) && (box5.innerText == box9.innerText)){
                    alert (box5.innerText + ' Win!')
                }
                else if ((box5.innerText == box3.innerText) && (box5.innerText == box7.innerText)){
                    alert (box5.innerText + ' Win!')
                }
                else if ((box5.innerText == box4.innerText) && (box5.innerText == box6.innerText)){
                    alert (box5.innerText + ' Win!')
                }
            }
            if (box1.innerText != ''  )
            {
                if ((box1.innerText == box2.innerText) && (box1.innerText == box3.innerText)){
                    alert (box1.innerText + ' Win!')
                }
                else if ((box1.innerText == box4.innerText) && (box1.innerText == box7.innerText)){
                    alert (box1.innerText + ' Win!')
                }
            }
            if (box9.innerText != ''  )
            {
                if ((box9.innerText == box6.innerText) && (box9.innerText == box3.innerText)){
                    alert (box9.innerText + ' Win!')
                }
                else if ((box9.innerText == box8.innerText) && (box9.innerText == box7.innerText)){
                    alert (box9.innerText + ' Win!')
                }
            }
        }

