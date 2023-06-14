using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName= "Leke Kelmendi", UserName= "leka", Email="lek.kelmendi@gmail.com"},
                    new AppUser{DisplayName= "Blerim Zylfiu", UserName= "blerimi", Email="blerim.zylfiu@gmail.com"},
                    new AppUser{DisplayName= "Lavdim Menxhiqi", UserName= "lavdaaa", Email="lavdim.menxhiqi@gmail.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Universities.Any()) return;

            var universities = new List<University>
            {
                new University
                {
                    Name = "University of Prishtina",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Email = "up@gmai.com",
                    PhoneNumber = "+383 44 555 777",
                },
                new University
                {
                    Name = "Kolegji Ilirija",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Email = "ilirija@email.net",
                    PhoneNumber = "+383 44 113 727",
                },
                new University
                {
                    Name = "AAB",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Email = "aab@hotmail.com",
                    PhoneNumber = "+377 44 101 000",
                },
                new University
                {
                    Name = "American University of Kosovo",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Email = "auk@auk-uni.net",
                    PhoneNumber = "+383 44 555 796",
                },
                new University
                {
                    Name = "University of Business and Technology",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Email = "ubt@ubt-uni.net",
                    PhoneNumber = "+383 45 881 515",
                },
               new University
                {
                    Name = "Universiteti FAMA",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Email = "kolegji.fama@gmail.com",
                    PhoneNumber = "+383 43 010 533",
                },
                new University
                {
                    Name = "Kolegji Rezonanca",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Email = "rezonanca@gmail.com",
                    PhoneNumber = "+383 44 323 177",
                },
                new University
                {
                    Name = "Kolegji Mehmet Akif",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Email = "mac@hotmail.com",
                    PhoneNumber = "+383 45 333 999",
                },

            };

            await context.Universities.AddRangeAsync(universities);

            if (context.Faculties.Any()) return;

            var faculties = new List<Faculty>
            {
                new Faculty
                {
                    Name = "Fakullteti i Inxhinierise Elektrike dhe Elektronike",
                    Email = "up@gmai.com",
                    PhoneNumber = "+383 44 414 777",
                    City = "Prishtine",
                    PostalCode = 10000,
                    Street = "Bregu i Diellit",
                    UniversityId= Guid.Parse("023eec21-f2b4-466e-ed60-08db6c4d1837")
                },
                new Faculty
                {
                    Name = "Fakullteti i Shkencave Kojputerike dhe Inxhinierise",
                    Email = "shki@gmail.com",
                    PhoneNumber = "+383 44 414 777",
                    City = "Prishtine",
                    PostalCode = 10000,
                    Street = "Objekti Dukagjini, Rr. Xhevdet Doda, nr. 10",
                    UniversityId= Guid.Parse("d0aae58e-d705-452d-ed64-08db6c4d1837")
                },
                new Faculty
                {
                    Name = "Fakullteti i Mekatronikes",
                    Email = "mek@gmail.com",
                    PhoneNumber = "+383 43 200 001",
                    City = "Lipjan",
                    PostalCode = 14000,
                    Street = "Te QMI, magjistralja Prishtine-Lipjan, kilometri i 5",
                   UniversityId= Guid.Parse("d0aae58e-d705-452d-ed64-08db6c4d1837")
                },
                new Faculty
                {
                    Name = "Fakullteti Eknomik",
                    Email = "fek@gmail.com",
                    PhoneNumber = "+383 43 243 123",
                    City = "Prishtine",
                    PostalCode = 10000,
                    Street = "Te Ministrija e Arsimit, rr. Tahir Zajmi, nr.9",
                    UniversityId= Guid.Parse("023eec21-f2b4-466e-ed60-08db6c4d1837")
                },
                new Faculty
                {
                    Name = "Fakullteti Juridik",
                    Email = "fjurdik@gmai.com",
                    PhoneNumber = "+383 45 221 616",
                    City = "Prishtine",
                    PostalCode = 10000,
                    Street = "Te Ministrija e Arsimit, rr. Tahir Zajmi, nr.7",
                   UniversityId= Guid.Parse("023eec21-f2b4-466e-ed60-08db6c4d1837")
                },
                new Faculty
                {
                    Name = "Fakullteti Stomatologjik",
                    Email = "rezo.stm@gmail.com",
                    PhoneNumber = "+383 45 909 717",
                    City = "Prishtine",
                    PostalCode = 10000,
                    Street = "Veternik, rr. Halil Snopqe, nr.12",
                     UniversityId= Guid.Parse("4dd0cc3c-2979-40ee-ed66-08db6c4d1837")
                },
                new Faculty
                {
                    Name = "Fakullteti i Kardiologjise",
                    Email = "rezo.kardio@gmai.com",
                    PhoneNumber = "+383 44 222 838",
                    City = "Prishtine",
                    PostalCode = 10000,
                    Street = "Pejton, rr. Garibaldi, nr.15",
                     UniversityId= Guid.Parse("4dd0cc3c-2979-40ee-ed66-08db6c4d1837")
                },
                new Faculty
                {
                    Name = "Fakullteti i Infirmierise",
                    Email = "aab.infirmieri@hotmail.com",
                    PhoneNumber = "+383 44 818 256",
                    City = "Fushe Kosove",
                    PostalCode = 10000,
                    Street = "Perball YUSK, rr. Anton Qeta, nr.4",
                     UniversityId= Guid.Parse("4dd0cc3c-2979-40ee-ed66-08db6c4d1837"),
                },
            };
            await context.Faculties.AddRangeAsync(faculties);

            await context.SaveChangesAsync();
        }
    }
}