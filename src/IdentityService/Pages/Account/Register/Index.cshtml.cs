﻿using System.Security.Claims;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityService.Pages.Account.Register;
[SecurityHeaders]
[AllowAnonymous]
[BindProperties]
public class Index(UserManager<ApplicationUser> userManager) : PageModel
{ 
    public RegisterViewModel Input { get; set; }
    public bool RegisterSuccess { get; set; }
    public IActionResult OnGet(string returnUrl)
    {
        Input = new RegisterViewModel
        {
            ReturnUrl = returnUrl,
        };
        return Page();
    }

    public async Task<ActionResult> OnPost()
    {
        if (Input.Button != "register") return Redirect("~/");
        if (!ModelState.IsValid) return Page();
        var user = new ApplicationUser()
        {
            UserName = Input.Username,
            Email = Input.Email,
            EmailConfirmed = true
        };
        var result = await userManager.CreateAsync(user, Input.Password);
        if (!result.Succeeded) return Page();
        await userManager.AddClaimsAsync(user, new Claim[]
        {
            new Claim(JwtClaimTypes.Name, Input.FullName)
        });
        RegisterSuccess = true;

        return Page();
    }
}