using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
         public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName= "Leke Kelmendi", UserName= "leka", Email="lek.kelmendi@gmail.com"},
                    new AppUser{DisplayName= "Blerim Zylfiu", UserName= "blerimi", Email="blerim.zylfiu@gmail.com"},
                    new AppUser{DisplayName= "Lavdim Menxhiqi", UserName= "lavdaaa", Email="lavdim.menxhiqi@gmail.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user,"Pa$$w0rd");
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


             if (context.Departments.Any()) return;
            
            var departments = new List<Department>
            {
                new Department
                {
                    Name = "Fakullteti i Inxhinierise Elektrike dhe Elektronike",
                    Email = "up@gmai.com",
                    PhoneNumber = "+383 44 555 777",
                    City = "Prishtine",
                    PostalCode = 10000,
                    Street = "Bregu i Diellit",
                    
                },
    
            };
            await context.SaveChangesAsync();
    }
    }
}