#!/usr/bin/perl
#use strict;
#use warnings;
#
# Script to get rid of duplicate descriptiosn from original data set
open my $input, '<', './data/pokemon/pokemon-v1.json' or die "can't open file";
while (<$input>) {
  if($_ =~ /description/) {
    if($_ =~ /: "(.*\..*\..*\..*\..*\.)\s*(.*\..*\..*\..*\..*\.)/) {
      if($1 =~ /($2)/) {
        print("    \"description\": \"$1\",");
        print("\n");
      } else {
        print($_);
      }
    }
    elsif($_ =~ /: "(.*\..*\..*\..*\.)\s*(.*\..*\..*\..*\.)/) {
      if($1 =~ /($2)/) {
        print("    \"description\": \"$1\",");
        print("\n");
      } else {
        print($_);
      }
    }
    elsif($_ =~ /: "(.*\..*\..*\.)\s*(.*\..*\..*\.)/) {
      if($1 =~ /($2)/) {
        print("    \"description\": \"$1\",");
        print("\n");
      } else {
        print($_);
      }
    } elsif ($_ =~ /: "(.*\..*\.)\s*(.*\..*\.)/) {
      if($1 =~ /($2)/) {
        print("    \"description\": \"$1\",");
        print("\n");
      } else {
        print($_);
      }
    } elsif ($_ =~ /: "(.*\.)\s*(.*\.)/) {
      if($1 =~ /($2)/) {
        print("    \"description\": \"$1\",");
        print("\n");
      } else {
        print($_);
      }
      
    } else {
      print($_);
    }
  } else {
    print($_);
  }
  
  chomp;
}
close $input or die "can't close";