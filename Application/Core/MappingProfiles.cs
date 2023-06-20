using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<University, University>();
            CreateMap<Faculty, Faculty>();
            CreateMap<Subject, Subject>();
        }
    }
}