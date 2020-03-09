package pas;

public class Person {
        private int id;
        private String fname, lname;

        public Person(int id, String fname, String lname) {
            this.id = id;
            this.fname = fname;
            this.lname = lname;
        }
        public Person() {
            this.id = -1;
        }
        
        public String getFName() {
            return this.fname;
        }
        
        public String getLName() {
            return this.lname;
        }
        
        public int getId() {
            return this.id;
        }

        public void setFName(String fname) {
            this.fname = fname;
        }

        public void setLName(String lname) {
            this.lname = lname;
        }
        
    }